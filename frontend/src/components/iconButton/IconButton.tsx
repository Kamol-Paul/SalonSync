export default function IconButton({
    text, icon, callback, direction = 'left', className = '', disabled = false
}: { text: string, icon: any, callback: Function, direction?: string, className?: string, disabled?: boolean }) {
    return (
        <button
            disabled={disabled}
            onClick={() => { callback() }}
            type="button"
            className={`h-[2.2rem] text-white ${!disabled ? "bg-[#3b5998]" : "bg-[#718fd1]"} ${!disabled ? "hover:bg-[#3b5998]/90 focus:ring-[#3b5998]/50 border-gray-800" : "border-gray-500"} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center me-2 mt-[1rem]  border-2 ${direction === 'left' ? 'flex-row' : 'flex-row-reverse'} ${className}`}
        >
            <span className="block w-full text-center">
                {text}
            </span>
            {icon}
        </button>
    );
}
