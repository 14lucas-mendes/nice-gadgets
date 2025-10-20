'use client'


import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select'

type ItemSelectProps = {
  items: {
    label: string;
    value: string;
  }[];
  title: string;
  value: string;
  setValue: (value: string) => void;
}
  

export default function ItemSelect({value, title, items, setValue}: ItemSelectProps) {
    

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string)
    }

    return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="item"
        onChange={handleChange}
        className='w-[176px] h-[40px]'
      >
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))}
       
      </Select>
    </FormControl>
    )
}