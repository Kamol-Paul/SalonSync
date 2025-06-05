export default function IconButton({
    text, icon, callback, direction = 'left', className = '', disabled = false
}: { text: string, icon: any, callback: Function, direction?: string, className?: string, disabled?: boolean }) {
    return (
        <button
            disabled={disabled}
            onClick={() => { callback() }}
            type="button"
            className={`h-[2.2rem] text-white font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center me-2 mt-[1rem] focus:ring-4 focus:outline-none transition-colors duration-200 font-sans ${disabled ? 'bg-brand-blue/50 cursor-not-allowed' : 'bg-brand-blue hover:bg-brand-blue/90 focus:ring-brand-blue/50'} ${direction === 'left' ? 'flex-row' : 'flex-row-reverse'} ${className}`}
        >
            <span className="block w-full text-center">
                {text}
            </span>
            {icon}
        </button>
    );
}
