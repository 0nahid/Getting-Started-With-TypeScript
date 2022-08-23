
export default function List({ items, onClick }: {
    items: Array<string>,
    onClick: (item: string) => void
}) {
    return (
        <>
            {
                items.map((items, index) => (
                    <li key={index}>
                        <button onClick={() => onClick(items)}>{items}</button>
                    </li>
                ))
            }
        </>
    );
}
