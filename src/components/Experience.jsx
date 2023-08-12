import {
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  useTexture,
  RoundedBox,
  CameraControls,
} from "@react-three/drei";
import * as THREE from "three";
import { Fish } from "./Fish";
import { MonsterStage } from "./MonsterStage";
import { Cactus } from "./Cactus";
import { Dragon } from "./Dragon";
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        10,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      <MonsterStage
        name={"Cactus"}
        color={"#76a040"}
        position-x={2.5}
        texture={"textures/anime_art_style_cactus_forest.jpg"}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Cactus
          scale={0.5}
          position-y={-1}
          position-z={-0.5}
          hovered={hovered === "Cactus"}
        />
      </MonsterStage>

      <MonsterStage
        color={"#20a1c8"}
        name={"Fish King"}
        texture={
          "textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
        }
        position-z={-1}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Fish
          scale={0.6}
          position-y={-1}
          position-z={-0.5}
          hovered={hovered === "Fish King"}
        />
      </MonsterStage>

      <MonsterStage
        name={"Dragon"}
        position-x={-2.5}
        texture={"textures/anime_art_style_lava_world.jpg"}
        rotation-y={Math.PI / 8}
        color={"#df8d52"}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Dragon
          scale={0.5}
          position-y={-1}
          position-z={-0.5}
          hovered={hovered === "Dragon"}
        />
      </MonsterStage>
    </>
  );
};
