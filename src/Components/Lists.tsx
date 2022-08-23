import List from "./List";

export default function Lists() {
    const items: string[] = ["Nahid", "Hassan", "Bulbul"];
    const onClick = (text: string) => {
        alert(text);
    }

    return (
        <div>
            <List items={items} onClick={onClick} />
        </div>
    )
}
