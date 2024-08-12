export default function NavigationBar({ navMenuContents, setIndex, index }: { navMenuContents: any[], setIndex: any, index: number }) {
    return (
        <div className="h-[86vh] border-black border-2 rounded-xl relative bg-[#ffae482b] flex flex-col space-y-2 pl-3 pr-6 mt-4 pt-12">
            {
                navMenuContents.map((item, i) => {
                    return (
                        <div key={i}
                            onClick={() => { setIndex(i) }}
                            className={`${index === i ? "border-black" : "border-transparent"} min-w-[11rem] flex flex-row space-x-2 p-2 cursor-pointer border rounded-md hover:border-black hover:bg-[#e9b166] group`}>
                            <span className="group-hover:text-white duration-200">
                                {item?.icon}
                            </span>

                            <h1 className="text-[#4d4e51] font-bold group-hover:text-white duration-200">
                                {item?.title}
                            </h1>
                        </div>
                    );
                })
            }
        </div>
    );
}