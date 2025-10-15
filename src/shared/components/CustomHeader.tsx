interface Props {
    title: string;
    description?: string
}
export const CustomHeader = ({ title, description }: Props) => {
    return (
        <div className='content-center'> {/*  Header */}
            <h1>{title}</h1>
            {description && <p data-testid="description-title">{description}</p>}
        </div>
    )
}
