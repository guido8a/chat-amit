import React from 'react'
import SendIcon from '@mui/icons-material/Send'
import {MyButtonBacan} from 'src/components/MyButtonBacan'

export const MySendButton = ({onSend, label='Admitir', disabled=false, myTip=''}) =>
  <MyButtonBacan label={label}
                 onClick={onSend}
                 myTip={myTip}
                 icon={SendIcon}
                 disabled={disabled}
                 bgColor0={'rgba(18, 219, 18, 1)'}
                 bgColor1={'rgba(14, 181, 14, 1)'} />
