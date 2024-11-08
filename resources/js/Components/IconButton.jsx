import { useState } from 'react';
import Icon from '@mdi/react';

export default function IconButton({ icon, color = 'indigo', onClick, title, type = 'button' }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const colors = {
        indigo: 'text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50',
        red: 'text-red-600 hover:text-red-900 hover:bg-red-50',
        blue: 'text-blue-600 hover:text-blue-900 hover:bg-blue-50',
        green: 'text-green-600 hover:text-green-900 hover:bg-green-50',
    };

    return (
        <div className="relative">
            <button
                type={type}
                onClick={onClick}
                className={`p-1.5 rounded-full transition-colors duration-150 ${colors[color]}`}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <Icon path={icon} size={0.8} />
            </button>

            {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap z-10">
                    {title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-800" />
                    </div>
                </div>
            )}
        </div>
    );
}
