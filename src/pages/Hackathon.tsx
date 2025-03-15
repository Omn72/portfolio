import React from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

/** 🔥 Global Style - Rocket Cursor */
const GlobalStyle = createGlobalStyle`
    body {
        cursor: url('https://upload.wikimedia.org/wikipedia/commons/3/3a/SpaceX_rocket_cursor.png'), auto;
    }
`;

const BackButton = styled.button`
    position: fixed;
    top: 20px;
    left: 20px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    z-index: 2;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

const HomeButton = styled(BackButton)`
    left: auto;
    right: 20px;
`;

const VisitButton = styled.a`
    display: inline-block;
    margin-top: 10px;
    padding: 8px 15px;
    background: #64ffda;
    color: #0a0a0a;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
    
    &:hover {
        opacity: 0.8;
    }
`;

const HackathonContainer = styled.div`
    min-height: 100vh;
    background: #0a0a0a;
    color: #ffffff;
    padding: 2rem;
    position: relative;
    overflow: hidden;
`;

/** 🔥 Twinkling Star Animation */
const twinkle = keyframes`
    0%, 100% {
        opacity: 0.8;
    }
    50% {
        opacity: 0.3;
    }
`;

interface StarProps {
    top: number;
    left: number;
    delay: number;
    duration: number;
}

const Star = styled.div<StarProps>`
    position: absolute;
    width: 3px;
    height: 3px;
    background: white;
    border-radius: 50%;
    animation: ${twinkle} 2s infinite alternate;
    top: ${({ top }) => top}%;
    left: ${({ left }) => left}%;
    animation-duration: ${({ duration }) => duration}s;
    animation-delay: ${({ delay }) => delay}s;
`;

const StarBackground = () => {
    const stars = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 2 + 1 // Random duration between 1s and 3s
    }));

    return (
        <div>
            {stars.map(star => (
                <Star 
                    key={star.id} 
                    top={star.top} 
                    left={star.left} 
                    delay={star.delay} 
                    duration={star.duration} 
                />
            ))}
        </div>
    );
};

const Content = styled.div`
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 2.5rem;
    color: #64ffda;
    margin-bottom: 2rem;
`;

const ProjectCard = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 1.5rem;
    margin: 1rem 0;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const Hackathon = () => {
    const projects = [
        {
            title: "Unified digital education platform covering all levels of from kindergarten to postgraduate",
            description: "Our team worked on Unified digital education platform covering all levels of from kindergarten to postgraduate . ",
            tech: ["React", "Node.js", "MongoDB", "Express"],
            year: "2025 AISSMS",
            link: "https://github.com/omn7/hackathon/"
        },
        // {
        //     title: "Project 2",
        //     description: "Description of hackathon project 2",
        //     tech: ["TypeScript", "Next.js", "Firebase"],
        //     year: "2022",
        //     link: "https://example.com/project2"
        // }
    ];

    return (
        <HackathonContainer>
            <GlobalStyle />
            <StarBackground />
            <BackButton onClick={() => window.history.back()}>Go Back</BackButton>
            <HomeButton onClick={() => window.location.href = "/"}>Go to Home Page</HomeButton>
            <Content>
                <Title>🚀 My Hackathon Projects 🚀</Title>
                {projects.map((project, index) => (
                    <ProjectCard key={index}>
                        <h2 className='pb-4'>{project.title} </h2>
                        <p className='pb-3 text-sm'>{project.description}</p>
                        <div>
                            {project.tech.map((tech, i) => (
                                <span key={i} style={{ marginRight: '10px', color: '#64ffda' }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <p>Year: {project.year}</p>
                        <VisitButton href={project.link} target="_blank" rel="noopener noreferrer">
                            Visit Project
                        </VisitButton>
                    </ProjectCard>
                ))}
            </Content>
        </HackathonContainer>
    );
};

export default Hackathon;
