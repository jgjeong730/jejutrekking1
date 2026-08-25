// Photos live in IndexedDB (not localStorage) — localStorage's ~5-10MB quota
// would fill up fast across 26 days × up to 5 photos each. IndexedDB quotas
// are far larger and built for exactly this kind of blob storage.

const DB_NAME = 'olle_photos_v1';
const STORE_NAME = 'photos';
const MAX_PHOTOS_PER_COURSE = 5;
const MAX_DIMENSION = 1280;
const JPEG_QUALITY = 0.72;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME, { keyPath: 'courseId' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** Resize + JPEG-compress an image file client-side before storing it. */
export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('이미지를 읽을 수 없어요'));
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('캔버스를 사용할 수 없어요')); return; }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export async function getPhotos(courseId: number): Promise<string[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(courseId);
    req.onsuccess = () => resolve(req.result?.photos ?? []);
    req.onerror = () => reject(req.error);
  });
}

// Read-modify-write inside a single readwrite transaction so concurrent
// calls (e.g. picking several photos in quick succession) can't race and
// silently drop one another's writes — IndexedDB serializes transactions
// against the same store, unlike two separate get()-then-put() round trips.
async function updatePhotos(courseId: number, mutate: (current: string[]) => string[]): Promise<string[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(courseId);
    let result: string[] = [];
    let aborted = false;
    getReq.onsuccess = () => {
      const current: string[] = getReq.result?.photos ?? [];
      try {
        result = mutate(current);
      } catch (e) {
        aborted = true;
        tx.abort();
        reject(e);
        return;
      }
      store.put({ courseId, photos: result });
    };
    tx.oncomplete = () => resolve(result);
    tx.onerror = () => { if (!aborted) reject(tx.error); };
  });
}

export async function addPhoto(courseId: number, file: File): Promise<string[]> {
  const compressed = await compressImage(file);
  return updatePhotos(courseId, (current) => {
    if (current.length >= MAX_PHOTOS_PER_COURSE) {
      throw new Error(`사진은 코스당 최대 ${MAX_PHOTOS_PER_COURSE}장까지예요`);
    }
    return [...current, compressed];
  });
}

export async function removePhoto(courseId: number, index: number): Promise<string[]> {
  return updatePhotos(courseId, (current) => current.filter((_, i) => i !== index));
}

export async function deleteAllPhotos(courseId: number): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(courseId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export const MAX_PHOTOS = MAX_PHOTOS_PER_COURSE;
