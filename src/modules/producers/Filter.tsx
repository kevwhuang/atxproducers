import React from 'react';

import useZustand from '../../hooks/useZustand';

import '../../styles/modules/producers/Filter.scss';

function Filter(): React.ReactElement {
    const [selectedSome, setSelectedSome] = React.useState(false);
    const [producers, updateProducers] = useZustand(s => [s.producers, s.updateProducers]);
    const [sort, updateSort] = useZustand(s => [s.sort, s.updateSort]);

    function Tag({ group, label, tag }: TagProps): React.ReactElement {
        const className = producers[group as keyof typeof producers][tag]
            ? `active filter__group--${group}` : `filter__group--${group}`;

        return (
            <button
                className={className}
                data-tag={tag}
                onClick={handleToggle}
            >
                {label}
            </button>
        );
    }

    function checkSelectedSome(): boolean {
        for (const group in producers) {
            for (const tag in producers[group as keyof typeof producers]) {
                if (producers[group as keyof typeof producers][tag]) return true;
            }
        }

        return false;
    }

    function handleAll(): void {
        for (const group in producers) {
            for (const tag in producers[group as keyof typeof producers]) {
                producers[group as keyof typeof producers][tag] = false;
            }
        }

        setSelectedSome(false);
        updateProducers(JSON.parse(JSON.stringify(producers)));
    }

    function handleCollapse(e: React.MouseEvent): void {
        if (!(e.target instanceof HTMLElement)) return;
        if (!(e.target.parentElement instanceof HTMLElement)) return;
        const buttons = e.target.parentElement.querySelectorAll('button');

        for (const button of buttons) {
            if (button.classList.contains('collapsed')) button.classList.remove('collapsed');
            else (button.classList.add('collapsed'));
        }
    }

    function handleSort(e: React.MouseEvent): void {
        if (!(e.target instanceof HTMLElement)) return;
        const key = e.target.innerText.split(' ')[2]!.toLowerCase() as keyof typeof sort;

        sort[key] = !sort[key];
        sort.prev = key === 'alias';
        updateSort(JSON.parse(JSON.stringify(sort)));
    }

    function handleToggle(e: React.MouseEvent): void {
        if (!(e.target instanceof HTMLElement)) return;
        const group = e.target.className.slice(e.target.className.indexOf('--') + 2);
        const tag = e.target.getAttribute('data-tag') as string;
        const cur = producers[group as keyof typeof producers][tag];

        producers[group as keyof typeof producers][tag] = !cur;
        setSelectedSome(checkSelectedSome());
        updateProducers(JSON.parse(JSON.stringify(producers)));
    }

    React.useEffect(() => setSelectedSome(checkSelectedSome()), []);

    return (
        <section className="filter">
            <div className="filter__group">
                <span onClick={handleCollapse}>Services</span>
                <Tag group="services" label="Production" tag="production" />
                <Tag group="services" label="Beatmaking" tag="beatmaking" />
                <Tag group="services" label="Musician" tag="musician" />
                <Tag group="services" label="Singing" tag="singing" />
                <Tag group="services" label="Songwriting" tag="songwriting" />
                <Tag group="services" label="Recording" tag="recording" />
                <Tag group="services" label="Mixing" tag="mixing" />
                <Tag group="services" label="Mastering" tag="mastering" />
                <Tag group="services" label="Post Production" tag="post" />
                <Tag group="services" label="Audio Editing" tag="editing" />
                <Tag group="services" label="Synthesis" tag="synthesis" />
                <Tag group="services" label="Live Sound" tag="live" />
                <Tag group="services" label="Teaching" tag="teaching" />
            </div>

            <div className="filter__group">
                <span onClick={handleCollapse}>Workstations</span>
                <Tag group="workstations" label="Pro Tools" tag="protools" />
                <Tag group="workstations" label="Ableton" tag="ableton" />
                <Tag group="workstations" label="FL Studio" tag="flstudio" />
                <Tag group="workstations" label="Logic" tag="logic" />
                <Tag group="workstations" label="GarageBand" tag="gargeband" />
                <Tag group="workstations" label="Reaper" tag="reaper" />
                <Tag group="workstations" label="Reason" tag="reason" />
                <Tag group="workstations" label="Cubase" tag="cubase" />
                <Tag group="workstations" label="Studio One" tag="studioone" />
            </div>

            <div className="filter__group">
                <span onClick={handleCollapse}>Genres</span>
                <Tag group="genres" label="Electronic" tag="electronic" />
                <Tag group="genres" label="Dance" tag="dance" />
                <Tag group="genres" label="Hip Hop" tag="hiphop" />
                <Tag group="genres" label="R&B" tag="rnb" />
                <Tag group="genres" label="Pop" tag="pop" />
                <Tag group="genres" label="Indie" tag="indie" />
                <Tag group="genres" label="Rock" tag="rock" />
            </div>

            <div className="filter__group">
                <span onClick={handleCollapse}>Instruments</span>
                <Tag group="instruments" label="Hardware" tag="hardware" />
                <Tag group="instruments" label="Vocals" tag="vocals" />
                <Tag group="instruments" label="Guitar" tag="guitar" />
                <Tag group="instruments" label="Keys" tag="keys" />
                <Tag group="instruments" label="Drums" tag="drums" />
                <Tag group="instruments" label="Brass" tag="brass" />
                <Tag group="instruments" label="Strings" tag="strings" />
                <Tag group="instruments" label="Woodwinds" tag="woodwinds" />
            </div>

            <div className="filter__actions">
                <button onClick={handleSort}>Sort by Alias</button>
                <button onClick={handleSort}>Sort by Name</button>
                <button disabled={!selectedSome} onClick={handleAll}>Clear</button>
            </div>
        </section>
    );
}

export default Filter;
