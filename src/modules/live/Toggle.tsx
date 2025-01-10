import React from 'react';

import useZustand from '../../hooks/useZustand';

import '../../styles/modules/live/Toggle.scss';

function Toggle(): React.ReactElement {
    const [module, changeModule] = useZustand(s => [s.module, s.changeModule]);

    return (
        <section className="toggle">
            <button
                className={module === 'submissions' ? 'active' : ''}
                onClick={() => changeModule('submissions')}
            >
                Submissions
            </button>
            <button
                className={module === 'resources' ? 'active' : ''}
                onClick={() => changeModule('resources')}
            >
                Resources
            </button>
        </section>
    );
}

export default Toggle;
