import toast, { Toaster } from 'react-hot-toast';
import React from 'react';

import '../../styles/modules/live/Submit.scss';

const config = {
    duration: 5000,
    style: {
        background: '#407ad6',
        color: '#f3f4f5',
        padding: '10px 20px',
        userSelect: 'none',
    },
};

function Submit(): React.ReactElement {
    const [inputText, setInputText] = React.useState('');

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();

        try {
            new URL(inputText);
        } catch {
            toast.error('Please enter a valid URL.', config as object);
            return;
        }

        try {
            const res = await fetch('https://aephonics.onrender.com/atxproducers/v1/submissions', {
                body: JSON.stringify({ stream: inputText }),
                method: 'post',
            });
            const data = await res.json();
            if (data !== inputText) throw Error;

            setInputText('');
            toast.success('Submitted!', config as object);
        } catch {
            toast.error('An error has occurred.', config as object);
        }
    }

    return (
        <section className="submit">
            <form className="submit__form" onSubmit={handleSubmit}>
                <input
                    maxLength={200}
                    placeholder="Enter source ..."
                    required
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                />
                <button>Submit</button>
            </form>
            <Toaster gutter={10} />
        </section>
    );
}

export default Submit;
