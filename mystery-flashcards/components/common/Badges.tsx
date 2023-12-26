"use client"

function Badges({
    badges,
    onClick = () => { }
}: {
    badges: string[],
    onClick?: (event: any, index: number) => any
}) {

    return (
        <div className="flex flex-wrap">
            {renderBadges()}
        </div>
    )

    function renderBadges() {
        return badges.map(renderBadge)
    }

    function renderBadge(badge: string, index: number) {
        return (
            <div
                key={badge}
                className="badge badge-secondary badge-outline mr-3 mt-2"
                onClick={(event) => onClick(event, index)}
            >
                {badge}
            </div>
        )
    }
}

export default Badges