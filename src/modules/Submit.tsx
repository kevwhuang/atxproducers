import React from 'react';
import axios from 'axios';

import '../styles/modules/Submit.scss';

function Submit(): React.ReactElement {
    const [inputText, setInputText] = React.useState('');

    async function handleSubmit(): Promise<void> {
        try {
            new URL(inputText);
        } catch {
            return alert('Please enter a valid URL.');
        }

        try {
            const res = await axios.post('/.netlify/functions/postSubmission', inputText);
            if (res.data !== inputText) throw Error;
            setInputText('');
            alert('Submitted!');
        } catch {
            alert('An error has occurred.');
        }
    }

    return (
        <section className="submit">
            <form>
                <input
                    placeholder="Enter source ..."
                    value={inputText}
                    maxLength={200}
                    required
                    onChange={e => setInputText(e.target.value)}
                />
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </section>
    );
}

export default Submit;
