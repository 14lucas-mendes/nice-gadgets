'use client'


import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select'

type ItemSelectProps = {
  value: string;
  setValue: (value: string) => void;
}
  

export default function ItemSelect({value, setValue}: ItemSelectProps) {
    

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string)
    }

    return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Itens on page</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
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