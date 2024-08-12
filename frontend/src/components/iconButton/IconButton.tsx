export default function IconButton({
    text, icon, callback, direction = 'left', className = ''
}: { text: string, icon: any, callback: Function, direction?: string, className?: string}) {
    return (
        <button
            onClick={() => { callback() }}
            type="button"
            className={`h-[2.2rem] text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center me-2 mt-[1rem] border-gray-800 border-2 ${direction === 'left' ? 'flex-row' : 'flex-row-reverse'} ${className}`}
        >
            <span className="block w-full text-center">
                {text}
            </span>
            {icon}
        </button>
    );
}
