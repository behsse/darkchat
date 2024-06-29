"use client"
import Linkify from 'react-linkify';

export const LinkifyComponant = ({children} : {children: React.ReactNode}) => {
    return <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
        <a target="_blank" style={{ color: 'rgb(29, 155, 240)', transition: "all .5s"}} href={decoratedHref} key={key} onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }} // Change la couleur au survol
        onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}>
            {decoratedText}
        </a>
    )}>{children}</Linkify>
}
