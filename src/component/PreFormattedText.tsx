
interface Props {
    key?: number;
    text: string[];
}
const PreFormattedText: React.FC<Props> = ( {key, text} ) => {
    const textString = text.join('\n');
    return (
        <div key={key} className=" w-full h-auto  overflow-x-hidden  ">
            <pre className=" w-full h-auto  text-wrap  dark:text-white">
                {textString}
            </pre>
            
        </div>
    )
}

export default PreFormattedText;