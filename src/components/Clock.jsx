import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

const Clock = ({ showIcon = true, className = "" }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    return (
        <div className={`flex items-center space-x-2 text-muted ${className}`}>
            {showIcon && <ClockIcon size={16} className="text-primary" />}
            <span className="text-sm font-medium tabular-nums">
                {formatTime(time)}
            </span>
        </div>
    );
};

export default Clock;
