import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const heroFrames = Array.from({ length: 60 }, (_, index) => {
  const frameNumber = String(index * 4 + 1).padStart(3, '0');
  return `/hero-frames/ezgif-frame-${frameNumber}.png`;
});

export function ThreeShoeHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const section = sectionRef.current;
    if (!mount || !section) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(34, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const textures = heroFrames.map((frame) => {
      const texture = loader.load(frame);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    });

    const material = new THREE.MeshBasicMaterial({
      map: textures[0],
      transparent: true,
      alphaTest: 0.01,
      side: THREE.DoubleSide,
    });
    const imagePlane = new THREE.Mesh(new THREE.PlaneGeometry(16, 9), material);
    scene.add(imagePlane);

    let animationFrame = 0;
    let activeTextureIndex = 0;
    let scrollProgress = 0;

    const resize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();

      const viewportHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const viewportWidth = viewportHeight * camera.aspect;
      const imageAspect = 16 / 9;
      const viewportAspect = viewportWidth / viewportHeight;

      if (viewportAspect > imageAspect) {
        imagePlane.scale.set(viewportWidth / 16, viewportWidth / imageAspect / 9, 1);
      } else {
        imagePlane.scale.set((viewportHeight * imageAspect) / 16, viewportHeight / 9, 1);
      }

      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    const updateScrollProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      scrollProgress = THREE.MathUtils.clamp(-rect.top / scrollableDistance, 0, 1);
    };

    const animate = () => {
      const nextTextureIndex = Math.min(textures.length - 1, Math.floor(scrollProgress * textures.length));

      if (nextTextureIndex !== activeTextureIndex) {
        activeTextureIndex = nextTextureIndex;
        material.map = textures[activeTextureIndex];
        material.needsUpdate = true;
      }

      imagePlane.rotation.y = THREE.MathUtils.lerp(imagePlane.rotation.y, (scrollProgress - 0.5) * 0.32, 0.08);
      imagePlane.rotation.x = THREE.MathUtils.lerp(imagePlane.rotation.x, Math.sin(scrollProgress * Math.PI) * -0.08, 0.08);
      imagePlane.position.y = THREE.MathUtils.lerp(imagePlane.position.y, Math.sin(scrollProgress * Math.PI) * 0.12, 0.08);

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    resize();
    updateScrollProgress();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateScrollProgress);
      textures.forEach((texture) => texture.dispose());
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Axecure sneaker animation"
      className="relative h-[220vh] bg-white"
    >
      <div className="sticky top-[61px] h-[calc(100vh-61px)] w-full overflow-hidden bg-white">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          src="/hero background image.png"
        />
        <div ref={mountRef} className="absolute inset-0" />
      </div>
    </section>
  );
}
