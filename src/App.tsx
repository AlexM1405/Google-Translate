import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import  {ArrowsIcon, ClipboardIcon, SpeakerIcon} from "./Components/Icons"
import  { useDebounce } from "./hooks/useDebounce"
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';


import './App.css'
import { useStore } from './hooks/useStore';
import { Auto_Language, Voice_for_Language} from './const';
import { LanguageSelector } from './Components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './Components/TextArea';
import { translate } from './Services/translate';


function App() {
  const { loading, fromLanguage, toLanguage, fromText, result, interchangeLanguages, setFromLanguage, setToLanguage, setFromText,setResult} = useStore()

  const debouncedFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = Voice_for_Language[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
        <Stack  gap={2}>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
           onChange={setFromLanguage}
           />
           <TextArea
             type={SectionType.From}
             value={fromText}
             onChange={setFromText}
            />
            </Stack>
        </Col>


        <Col xs="auto">
        <Button variant='link' disabled={fromLanguage === Auto_Language} onClick={interchangeLanguages}>
        <ArrowsIcon/>
        </Button>
        </Col>

        <Col>
        <Stack  gap={2}>
          <LanguageSelector 
          type={SectionType.To}
          value={toLanguage}
          onChange={setToLanguage}
          />
           <div style={{ position: 'relative' }}>
            <TextArea
            loading={loading}
            type={SectionType.To}
            value={result}
            onChange={setResult}
            />

            <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
            <Button
              variant='link'
              onClick={handleClipboard}>
                <ClipboardIcon />
            </Button>
            <Button
              variant='link'
              onClick={handleSpeak}>
                <SpeakerIcon /> 
            </Button>
            </div>

            </div>
            </Stack>
        </Col>


      </Row>
    </Container>
  )
}

export default App
