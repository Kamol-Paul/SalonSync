import { useSelector, useDispatch } from 'react-redux';

export default function Modal() {
    const isModalVisible = useSelector((state: any) => state.isModalVisible);
    const content = useSelector((state: any) => state.content);
    const dispatch = useDispatch();

    if (!isModalVisible) {
        return null;
    }

    return (
        <>
            <div className="bg-black/50 flex justify-center items-center fixed top-0 left-0 w-full h-full z-[100]">
                <div className="bg-white dark:bg-brand-gray rounded-xl shadow-2xl p-6 w-[90vw] md:w-[50vw] lg:w-[30vw] relative">
                    <h1 className="font-heading text-xl text-text-primary dark:text-slate-100 mb-4">
                        {content?.title}
                    </h1>
                    <button
                        className="text-text-secondary hover:text-text-primary dark:text-slate-400 dark:hover:text-slate-200 absolute top-4 right-4 text-2xl"
                        onClick={() => {
                            dispatch({ type: 'HIDE_MODAL', });
                        }}>
                        ×
                    </button>
                    {content?.body}
                </div>
            </div>
        </>
    )
}