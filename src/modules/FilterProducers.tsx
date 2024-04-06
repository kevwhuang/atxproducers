import React from 'react';

import useZustand from '../hooks/useZustand';

import '../styles/modules/FilterProducers.scss';

function FilterProducers(): React.ReactElement {
    const [selectedSome, setSelectedSome] = React.useState(false);
    const [producers, updateProducers] = useZustand(s => [s.producers, s.updateProducers]);
    const [sort, updateSort] = useZustand(s => [s.sort, s.updateSort]);

    function Tag({ group, label, tag }: TagProps): React.ReactElement {
        const className = producers[group as keyof typeof producers][tag]
            ? `active filter-producers__group--${group}` : `filter-producers__group--${group}`;
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
        <section className="filter-producers">
            <div className="filter-producers__group">
                <span onClick={handleCollapse}>Services</span>
                <Tag group="services" tag="production" label="Production" />
                <Tag group="services" tag="beatmaking" label="Beatmaking" />
                <Tag group="services" tag="musician" label="Musician" />
                <Tag group="services" tag="singing" label="Singing" />
                <Tag group="services" tag="songwriting" label="Songwriting" />
                <Tag group="services" tag="recording" label="Recording" />
                <Tag group="services" tag="mixing" label="Mixing" />
                <Tag group="services" tag="mastering" label="Mastering" />
                <Tag group="services" tag="post" label="Post Production" />
                <Tag group="services" tag="editing" label="Audio Editing" />
                <Tag group="services" tag="synthesis" label="Synthesis" />
                <Tag group="services" tag="live" label="Live Sound" />
                <Tag group="services" tag="teaching" label="Teaching" />
            </div>
            <div className="filter-producers__group">
                <span onClick={handleCollapse}>Workstations</span>
                <Tag group="workstations" tag="protools" label="Pro Tools" />
                <Tag group="workstations" tag="ableton" label="Ableton" />
                <Tag group="workstations" tag="flstudio" label="FL Studio" />
                <Tag group="workstations" tag="logic" label="Logic" />
                <Tag group="workstations" tag="gargeband" label="GarageBand" />
                <Tag group="workstations" tag="reaper" label="Reaper" />
                <Tag group="workstations" tag="reason" label="Reason" />
                <Tag group="workstations" tag="cubase" label="Cubase" />
                <Tag group="workstations" tag="studioone" label="Studio One" />
            </div>
            <div className="filter-producers__group">
                <span onClick={handleCollapse}>Genres</span>
                <Tag group="genres" tag="electronic" label="Electronic" />
                <Tag group="genres" tag="dance" label="Dance" />
                <Tag group="genres" tag="hiphop" label="Hip Hop" />
                <Tag group="genres" tag="rnb" label="R&B" />
                <Tag group="genres" tag="pop" label="Pop" />
                <Tag group="genres" tag="indie" label="Indie" />
                <Tag group="genres" tag="rock" label="Rock" />
            </div>
            <div className="filter-producers__group">
                <span onClick={handleCollapse}>Instruments</span>
                <Tag group="instruments" tag="hardware" label="Hardware" />
                <Tag group="instruments" tag="vocals" label="Vocals" />
                <Tag group="instruments" tag="guitar" label="Guitar" />
                <Tag group="instruments" tag="keys" label="Keys" />
                <Tag group="instruments" tag="drums" label="Drums" />
                <Tag group="instruments" tag="brass" label="Brass" />
                <Tag group="instruments" tag="strings" label="Strings" />
                <Tag group="instruments" tag="woodwinds" label="Woodwinds" />
            </div>
            <div className="filter-producers__actions">
                <button onClick={handleSort}>Sort by Alias</button>
                <button onClick={handleSort}>Sort by Name</button>
                <button onClick={handleAll} disabled={!selectedSome}>Clear</button>
            </div>
        </section>
    );
}

export default FilterProducers;
