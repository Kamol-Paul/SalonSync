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
            <div className="fixed top-0 left-0 w-full h-full bg-[#000000a2] flex justify-center items-center z-[100]">
                <div className="bg-[#ffffffed] w-[30vw] h-auto p-4 rounded-xl shadow-lg">
                    <div className="flex flex-row justify-between">
                        <h1 className="font-bold text-xl">
                            {content?.title}
                        </h1>
                        <button className="bg-red-500 text-white p-1 rounded-full w-9 h-9" onClick={() => {
                            dispatch({ type: 'HIDE_MODAL', });
                        }}>X</button>
                    </div>
                    {content?.body}
                </div>
            </div>
        </>
    )
}