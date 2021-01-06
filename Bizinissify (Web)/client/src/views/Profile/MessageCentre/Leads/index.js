import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import firebase from '../../../../services/firebase'
import firebaseModule from 'firebase/app'
import './styles.css'
import { OrangeButton } from '../../../../components'
import { customisedAction } from '../../../../redux/actions'
import { SET_TOAST } from '../../../../constants'

function Leads(props) {

  const [chatsList, setChatsList] = useState([])
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [sellerDetails, setSellerDetails] = useState(null)

  const messageList = useRef(null)
  const [refVisible, setRefVisible] = useState(false)
  const [message, setTypedMessage] = useState('')

  const user = useSelector(({ sessionReducer }) => sessionReducer.user)
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.db
      .collection('chats')
      .where('users', 'array-contains', user.email)
      .onSnapshot(snapshot => {
          const chats = snapshot.docs.map(_doc => {
            return {
              id: _doc.id,
              data: _doc.data()
            }
          })
          chats.sort((a, b) => {
            return a.data.lastUpdated - b.data.lastUpdated
          })
          setChatsList(chats)
          if (selectedChatId
            && listContainsSelected(chats)
            && listContainsSelected(chatsList)
            && listContainsSelected(chats).data.messages
            && listContainsSelected(chatsList).data.messages
            && listContainsSelected(chats).data.messages.length !== listContainsSelected(chatsList).data.messages.length)
            scrollToEnd()
      })
      if (props && props.chatID && !sellerDetails) {
        setSellerDetails(props.sellerDetails)
        chatexists(props.chatID)
        .then(userExists => {
          if (!userExists) {
            startNewChat(props.chatID, props.sellerDetails)
          }
          else setSelectedChatId(props.chatID)
        })
      } 
      scrollToEnd()
  }, [user.email, selectedChatId, refVisible])

  function scrollToEnd() {
    if (messageList.current) messageList.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  async function chatexists(chatID) {
    return new Promise( async (resolve, reject) => {
      const chat = await firebase.db
        .collection('chats')
        .doc(chatID)
        .get()
      resolve(chat.exists)
   });
  }

  async function startNewChat(chatID, sellerDetails) {
    await firebase.db
      .collection('chats')
      .doc(chatID)
      .set({
        lastUpdated: Date.now(),
        messages: [{
          message: `Hi ${sellerDetails.name}`,
          sender: user.email,
          timeStamp: Date.now()
        }],
        userSNames: [user.name, `${sellerDetails.name} ${sellerDetails.lastName}`],
        users: [user.email, sellerDetails.email]
      })
      .then(() => setSelectedChatId(props.chatID))
  }

  function listContainsSelected(list) {
    const selected = list.filter(list => list.id === selectedChatId)
    return selected.length ? selected[0] : null
  }

  function sendMessage() {
    try {
      firebase.db
        .collection('chats')
        .doc(selectedChatId)
        .update({
          messages: firebaseModule.firestore.FieldValue.arrayUnion({
            message,
            sender: user.email,
            timeStamp: Date.now()
          }),
          lastUpdated: Date.now()
        })
      setTypedMessage('')
    } catch (error) {
      dispatch(customisedAction(SET_TOAST, { message: error.message, type: 'error' }))
    }
  }

  function deleteChat(chatId) {
    try {
      firebase.db
        .collection('chats')
        .doc(chatId)
        .delete()
    } catch (error) {
      dispatch(customisedAction(SET_TOAST, { message: error.message, type: 'error' }))
    }
  }
  
  const renderChatsList = () => {
    return chatsList.map((list, index) => {
      const nameIndex = list.data.users
        .map((userEmail, index) => userEmail !== user.email ? index : null)
        .filter(val => val !== null)[0]
      return (
        <div key={list.id}
          style={{ display: 'flex', marginTop: '10px',
            padding: '10px 10px 0px',
            backgroundColor: selectedChatId === list.id ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
            borderRadius: '5px',
            borderTop: index !== (chatsList.length -1) ? '1px solid rgba(0, 0, 0, 0.1)' : ''
          }}>
          <div style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedChatId(chatsList[index].id)
              setTypedMessage('')
            }}>
            <img src={require('../../../../assets/SVG/msg_profile.svg')} alt="heart_small" />
          </div>
          <div style={{ flex: 1, margin: '0px 10px', cursor: 'pointer' }}
            onClick={() => {
              setSelectedChatId(chatsList[index].id)
              setTypedMessage('')
            }}>
            <p style={{ fontSize: '20px' }}>{list.data.userSNames[nameIndex]}</p>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(0, 0, 0, 0.5)' }}>
              {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'})
                .format(list.data.lastUpdated)}
            </p>
            <div style={{ height: '40px', overflow: 'hidden', marginTop: '5px' }}>
              <p className="ShortMessage">
                {list.data.messages && list.data.messages.length ? list.data.messages[list.data.messages.length - 1].message : ''}
              </p>
            </div>
          </div>
          <div>
            <img style={{ cursor: 'pointer' }}
              onClick={() => deleteChat(list.id)}
              src={require('../../../../assets/SVG/bin.svg')} alt="heart_small" />
          </div>
        </div>
      )
    })
  }
  
  const renderChatTopBar = () => {
    const selected = listContainsSelected(chatsList)
    if (selected) {
      const nameIndex = selected.data.users
        .map((userEmail, index) => userEmail !== user.email ? index : null)
        .filter(val => val !== null)[0]
      const name = selected.data.userSNames[nameIndex]
      return (
        <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0px', borderBottom: '2px solid orange'}}>
          <p style={{ flex: 1, padding: '0px 0px 10px 20px', fontSize: '20px' }}>
            {name}
          </p>
          <div>
            <img style={{ height: '80%', cursor: 'pointer' }}
              onClick={() => deleteChat(selectedChatId)}
              src={require('../../../../assets/SVG/bin.svg')} alt="heart_small" />
          </div>
        </div>
      )
    } else setSelectedChatId(null)
  }
  
  const renderMessages = () => {
    const selected = listContainsSelected(chatsList)
    return selected && selected.data.messages ? selected.data.messages.map((data, index) => {
      return (
        <div key={index}
          style={{
            display: 'flex',
            marginBottom: '10px',
            justifyContent: data.sender === user.email ? 'flex-start' : 'flex-end'
          }}>
            <div style={{ width: '70%' }}>
              <p style={{
                backgroundColor: data.sender === user.email ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 230, 204, 0.3)',
                fontSize: '16px', fontWeight: 300, color: 'rgb(0, 0, 0)',
                borderRadius: '5px',
                padding: '10px'
              }}>{data.message}</p>
              <div style={{ display: 'flex',
                justifyContent: data.sender === user.email ? 'flex-end' : 'flex-start'
              }}>
                <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(0, 0, 0, 0.5)' }}>
                  {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'})
                  .format(data.timeStamp)} | {new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
                  .format(data.timeStamp)}
                </p>
              </div>
            </div>
        </div>
      )
    }) : null
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', height: '64vh' }}>
      <div style={{ flex: 2, overflow: 'scroll', borderRight: '1px solid rgba(0, 0, 0, 0.1)' }}>
        <p style={{ marginTop: '10px', paddingBottom: '10px', fontSize: '20px', borderBottom: '2px solid rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>Messages</p>
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'column-reverse' }}>
          {renderChatsList()}
        </div>
      </div>
      {selectedChatId ?
        <div style={{ flex: 5, display: 'flex', flexDirection: 'column' }}>
          {renderChatTopBar()}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'column', marginLeft: '15px', marginBottom: '5px' }}>
            <div style={{ flex: 1, overflow: 'scroll' }}>
              {renderMessages()}
              <div ref={el => { messageList.current = el; setRefVisible(!!el); }} />
            </div>
            <div style={{ display: 'flex', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '10px' }}>
              <input 
                className="Input"
                type='text'
                style={{ border: 'none', flex: 1, fontSize: '16px' }}
                placeholder='Write Message Here . . .'
                value={message}
                onKeyDown={ev => ev.key === 'Enter' && message && message.replace(/ /g, '') ? sendMessage() : null}
                onChange={ev => setTypedMessage(ev.target.value)} />
              <OrangeButton
                text="Send"
                disabled={!message || !message.replace(/ /g, '')}
                disabledAction={() => null}
                onClick={() => sendMessage()}
              />
            </div>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default Leads
