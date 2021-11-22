import React,{ useState,useCallback } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

const AddNode = (props) =>{
    // ここからuseState
    //// 表示されているテキスト
    const addNote = props.addNote
    const [ dispText,setDispText ] = useState('')

    // ここからuseCallback
    //// テキスト変更時
    const handleChange = useCallback((event) => {
        setDispText(event.target.value)
    },[])
    //// note追加ボタン押下時
    const handleClick = useCallback(() => {
        addNote({ text:dispText })
        setDispText('')
    },[dispText,addNote])

    // デバッグログ
    // console.log("distText",dispText)

    // ここから画面表示
    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="New Note 2"
                    variant="outlined"
                    value={dispText}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={4}>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    size="large"
                >
                    追加
                </Button>
            </Grid>
        </Grid>
    )
}

export default AddNode