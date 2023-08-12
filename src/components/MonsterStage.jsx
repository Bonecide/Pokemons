import {
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import * as THREE from "three";
export function MonsterStage({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) {
  const map = useTexture(texture);
  const portalMaterial = useRef();
  useCursor(hovered)
  useFrame((_state,delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend" , worldOpen ? 1 : 0 , 0.2,delta)
  })
  return (
    <>
      <group {...props}>
        <Text
          font="fonts/Caprasimo-Regular.ttf"
          fontSize={0.3}
          position={[0, -1.3, 0.051]}
          anchorY={"bottom"}
        >
          {name}
          <meshBasicMaterial color={color} />
        </Text>
        <RoundedBox
          args={[2, 3, 0.1]}
          radius={0.15}
          onDoubleClick={() => setActive(active === name ? null : name)}
          name={name}
          onPointerEnter={() => setHovered(name)}
          onPointerLeave={() => setHovered(null)}
        >
          <planeGeometry args={[2, 3]} />
          <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterial}>
            <ambientLight intensity={1} />
            <Environment preset="sunset" />
            {children}
            <mesh>
              <sphereGeometry args={[6, 64, 64]} />
              <meshStandardMaterial map={map} side={THREE.BackSide} />
            </mesh>
          </MeshPortalMaterial>
        </RoundedBox>
      </group>
    </>
  );
}
