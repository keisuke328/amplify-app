import { useState,useEffect } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createNote, deleteNote } from './graphql/mutations'
import { listNotes } from './graphql/queries'

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import awsExports from './aws-exports'

import AddNote from './components/AddNote'
import NotesList from './components/NotesList'

Amplify.configure(awsExports)

const App = () => {
  //ここからuseState
  const [ notes,setNotes ] = useState([])

  //ここからuseEffect
  // useEffect(async () => {
  //   const result = await API.graphql(graphqlOperation(listNotes))
  //   setNotes(result.data.listNotes.items)
  // },[])

  useEffect(() => {
    const fetchListNotes = async () => {
      const result = await API.graphql(graphqlOperation(listNotes))
      setNotes(result.data.listNotes.items)
    }
    fetchListNotes()
  },[])

  // 追加関数
  const addNote = async (note) => {
    const result = await API.graphql(graphqlOperation(createNote, { input: note }))
    setNotes([...notes,result.data.createNote])
  }

  // 削除関数
  const delNote = async (note) => {
    const id = {
      id: note.id
    }
    await API.graphql(graphqlOperation(deleteNote, { input: id }))
    setNotes(notes.filter(item => item.id !== note.id))
  }

  // デバッグ
  // console.log("notes",notes)

  return(
    <div style={styles.container}>
      <h1>Notes App</h1>
      <AddNote addNote={addNote} />
      <NotesList notes={notes} delNote={delNote} />
      <AmplifySignOut />
    </div>
  )
}

export default withAuthenticator(App)

const styles = {
  container: { width: 480, margin: '0 auto', padding: 20 },
  form: { display: 'flex', marginBottom: 15 },
  input: { flexGrow: 2, border: 'none', backgroundColor: '#ddd', padding: 12, fontSize: 18 },
  addButton: { backgroundColor: 'black', color: 'white', outline: 'none', padding: 12, fontSize: 18 },
  note: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, marginBottom: 15 },
  deleteButton: { fontSize: 18, fontWeight: 'bold' }
}