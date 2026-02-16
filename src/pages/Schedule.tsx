import ScheduleMap from '../components/ScheduleMap';

const Schedule = () => {
    return (
        <div className="min-h-screen bg-gray-100 pb-24">
            <div className="bg-white p-6 sticky top-0 z-10 shadow-sm mb-4">
                <h1 className="text-xl font-bold text-center">여행 일정표</h1>
            </div>

            <div className="p-4">
                <ScheduleMap />
            </div>
        </div>
    );
};

export default Schedule;
