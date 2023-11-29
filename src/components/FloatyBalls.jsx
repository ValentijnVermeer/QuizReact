import { useEffect } from 'react';
import './FloatingBalls.css'

function FloatingBalls() {
    useEffect(() => {
        const handleMouseMove = (e) => {
          const ball = document.createElement('div');
          ball.setAttribute('class', 'ball');
          ball.style.left = `${e.pageX}px`;
          ball.style.top = `${e.pageY}px`;
          document.body.appendChild(ball);
      
          ball.style.transition = 'all 0.5s linear 0s';
          ball.style.left = ball.offsetLeft - 6 + 'px'; // Adjusted from 20 to 10
          ball.style.top = ball.offsetTop - 6 + 'px'; // Adjusted from 20 to 10
      
          ball.style.width = '20px'; // Adjusted from 40 to 20
          ball.style.height = '20px'; // Adjusted from 40 to 20
          ball.style.borderRadius = '50%';
          ball.style.opacity = 0;
      
          setTimeout(function() {
            ball.remove();
          }, 500);
        };
      
        document.addEventListener('mousemove', handleMouseMove);
      
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);

  return null;
}

export default FloatingBalls;