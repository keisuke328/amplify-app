import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const NotesList = (props) =>{
    // デバッグログ
    // console.log("props",props)
    // ここから画面表示
    return (
        <List>
            {props.notes.map((note)=>(
                <ListItem
                    key={note.id}
                    secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={()=>props.delNote(note)}
                    >
                        <DeleteIcon />
                    </IconButton>
                    }
                >
                    <ListItemText
                        primary={note.text}
                    />
                </ListItem>
            )
        )}
        </List>
    )
}

export default NotesList