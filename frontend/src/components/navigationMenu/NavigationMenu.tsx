export default function NavigationBar({ navMenuContents, setIndex, index }: { navMenuContents: any[], setIndex: any, index: number }) {
    return (
        <div className="h-[86vh] border-brand-gray/30 dark:border-brand-gray/50 border rounded-xl relative bg-slate-100 dark:bg-brand-gray/20 flex flex-col space-y-2 pl-3 pr-6 mt-4 pt-12">
            {
                navMenuContents.map((item, i) => {
                    return (
                        <div key={i}
                            onClick={() => { setIndex(i) }}
                            className={`${index === i ? "border-brand-blue" : "border-transparent"} min-w-[11rem] flex flex-row space-x-2 p-2 cursor-pointer border rounded-md hover:border-brand-blue/70 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 group`}>
                            <span className="text-text-secondary group-hover:text-brand-blue duration-200">
                                {item?.icon}
                            </span>

                            <h1 className="text-text-primary dark:text-slate-200 font-sans group-hover:text-brand-blue duration-200">
                                {item?.title}
                            </h1>
                        </div>
                    );
                })
            }
        </div>
    );
}