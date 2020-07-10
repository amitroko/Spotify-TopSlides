import React from 'react';
import Select from 'react-select';

const pStyle = {
    float: 'left'
}

function ShowSelect({style, label, options, onChange, defaultValue}) {
    return <div style={style}>
        <p style={pStyle}>{label}</p>
        <Select options={options} onChange={onChange} defaultValue={defaultValue}/>
    </div>
}

export default ShowSelect;