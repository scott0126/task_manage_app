import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'relative flex items-center px-1 pt-1 text-sm font-medium leading-5 transform hover:animate-scaleUp ' +
                (active
                    ? 'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-[80%] before:w-2 before:bg-[#0000ff] pl-3 text-[#0000ff]'
                    : 'border-transparent text-black hover:text-[#0000ff] hover:blue-300 focus:text-[#0000ff] focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
