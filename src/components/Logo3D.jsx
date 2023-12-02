import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
// 3D logo 에 대한 메테리얼값은 three.js의 기본도형 참조
export function Logo3D(props) {
  const { nodes, materials } = useGLTF('logo/scene2.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[24.052, 117.48, 10.526]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh geometry={nodes.Object_6.geometry} material={materials['Material.010']} material-opacity={1} />
            <mesh geometry={nodes.Object_7.geometry} material={materials['Material.011']} material-opacity={1}/>
          </group>
          <mesh geometry={nodes.Object_4.geometry} material={materials['Material.009']} position={[18.962, 117.48, 10.526]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
          <mesh geometry={nodes.Object_9.geometry} material={materials['Material.012']} position={[42.712, 209.044, 23.565]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={100} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('logo/scene2.gltf')
