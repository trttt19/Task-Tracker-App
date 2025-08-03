import React from 'react'

function PriorityDropdown({ value, onChange }) {
    const priorities
        = [
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
        ];
    return (
        <select className="form-select" value={value} onChange={onChange}>

            {priorities
                .map((PriorityDropdown) => (
                    <option key={PriorityDropdown.value} value={PriorityDropdown.value}>
                        {PriorityDropdown.label}
                    </option>
                ))}
        </select>
    );
}

export default PriorityDropdown