import React from 'react'

function StatusDropDown({ value, onChange }) {
    const statuses = [
        { value: "toDo", label: "To Do" },
        { value: "inProgress", label: "In Progress" },
        { value: "done", label: "Done" },
    ];
    return (
        <select className="form-select" value={value} onChange={onChange}>
            {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                    {status.label}
                </option>
            ))}
        </select>
    );
}

export default StatusDropDown