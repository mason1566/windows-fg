import Icon from "./Icon";
import peter from "./assets/peter.png"

export default function Desktop({ id }) {
    return (
        <div id={id}>
            <Icon imageUrl={peter} width="80px" height="100px" />
        </div>
    );
}