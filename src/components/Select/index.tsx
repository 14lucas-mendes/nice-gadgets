'use client'


import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react';

export default function ItemSelect() {
    const [item, setItem] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setItem(event.target.value as string)
    }

    return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Itens on page</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={item}
        label="item"
        onChange={handleChange}
      >
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={16}>16</MenuItem>
        <MenuItem value={'All'}>All</MenuItem>
      </Select>
    </FormControl>
    )
}