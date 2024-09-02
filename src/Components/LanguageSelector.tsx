
import { Form } from "react-bootstrap"
import { Auto_Language, Supported_Languages } from "../const"
import { SectionType, FromLanguage, Language } from "../types.d"

type Props =
    | { type: SectionType.From, value: FromLanguage, onChange:(Language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange:(Language: Language) => void }

export const LanguageSelector = ({ onChange, type, value }: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    return (
        <Form.Select aria-label="Select a language" onChange={handleChange} value={value}>
            {type === SectionType.From && <option value={Auto_Language}>Detect language</option>}  
            {Object.entries(Supported_Languages).map(([key, literal]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </Form.Select>
    )
}