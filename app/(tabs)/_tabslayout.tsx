import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // O cualquier conjunto de íconos que uses

// Helper component for icons
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' /* Cambia el color activo */ }}>
      {/* 1. Pestaña: 'index.tsx' 
           - Corresponde a la ruta '/tabs/' o '/tabs/index'
      */}
      <Tabs.Screen
        name="CompletedTask" // Debe coincidir con el nombre del archivo (sin la extensión)
        options={{
          title: 'Inicio', // Título que se muestra en la pestaña
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: true, // Si quieres que tenga un encabezado en esta pantalla
        }}
      />
      
      {/* 2. Pestaña: 'dashboard.tsx' 
           - Corresponde a la ruta '/tabs/dashboard'
      */}
      <Tabs.Screen
        name="dashboard" // Debe coincidir con el nombre del archivo
        options={{
          title: 'Panel',
          tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={color} />,
          headerShown: true,
        }}
      />

      {/* 3. Pestaña: 'CompletedTask.tsx' 
           - Corresponde a la ruta '/tabs/CompletedTask'
           - **IMPORTANTE:** Cuando el nombre del archivo es camelCase (Ej: CompletedTask),
             `expo-router` lo mapea directamente.
      */}
      <Tabs.Screen
        name="CompletedTask" // Debe coincidir con el nombre del archivo
        options={{
          title: 'Tareas Completadas',
          tabBarIcon: ({ color }) => <TabBarIcon name="check-square" color={color} />,
          headerShown: true,
        }}
      />
      
      {/* 4. Pestaña: 'index.tsx' (si hay otro index en una subcarpeta, pero en tu imagen 
           parece ser el mismo nivel que dashboard, por lo que usaré el que tiene la M - Modificado)
           - Si tienes dos 'index.tsx' en el mismo directorio (tabs), esto podría causar
             conflicto o un comportamiento inesperado. Asumo que el 'index.tsx' en color verde (A - Añadido)
             es el principal, y el otro 'index.tsx' (M - Modificado) es de una subcarpeta 
             que no se ve o es un error en el listado.
             
           **Aclaración sobre `_tabs_layout.tsx`:** El archivo `_tabs_layout.tsx` *no* es una pantalla,
           sino el layout. Asumo que es el archivo que se debe usar para la configuración.
      */}
    </Tabs>
  );
}