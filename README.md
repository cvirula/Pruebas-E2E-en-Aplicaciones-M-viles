# Turno

Aplicación móvil de agendamiento creada con React Native, Expo SDK 57 y Expo Router. Permite elegir un servicio, especialista, fecha y hora; confirmar la reserva; consultar las citas; reprogramarlas o cancelarlas.

## Ejecutar la aplicación

Requisitos: Node.js 20.19 o superior y un emulador Android o dispositivo con Expo Go.

```bash
npm install
npm start
```

Después, escanea el código QR con Expo Go o presiona `a` para abrir Android. Para crear un build nativo instalable, usa:

```bash
npx expo run:android
```

## Pruebas BDD con Gherkin y Maestro

Los criterios de aceptación están escritos en español con Gherkin en `features/agendamiento.feature`. Cada escenario está vinculado uno-a-uno con un Flow ejecutable de Maestro en `.maestro/`. Los Flows usan `testID` estables, no textos dependientes del idioma para las acciones principales. El identificador nativo de la app es `com.turno.app`.

1. Instala Maestro CLI y Java 17 o superior.
2. Inicia un emulador Android.
3. Instala el build nativo con `npx expo run:android`.
4. Valida que cada escenario Gherkin tenga su automatización Maestro:

```bash
npm run test:gherkin
```

5. Ejecuta todos los recorridos automatizados:

```bash
npm run test:maestro
```

Para generar un reporte HTML de Maestro:

```bash
npm run test:maestro:report
```

Mientras no haya un emulador Android, el mismo recorrido puede ejecutarse con el soporte web oficial de Maestro.dev contra la vista Expo local:

```bash
npm start
npm run test:maestro:web
```

Para generar el reporte web:

```bash
npm run test:maestro:web:report
```

El recorrido principal valida de extremo a extremo:

- Apertura de la app.
- Selección de servicio y especialista.
- Selección de fecha y hora.
- Confirmación de la cita.
- Consulta de la reserva en “Mis citas”.
- Cancelación y visualización en el historial.

El flujo `empty-state.yaml` verifica la agenda vacía desde una instalación limpia.

## Estructura

- `src/app/`: pantallas y navegación con Expo Router.
- `src/components/`: componentes reutilizables.
- `src/context/`: estado local de reservas.
- `.maestro/`: pruebas móviles automáticas.
- `.maestro-web/`: ejecución inmediata de los mismos escenarios mediante Maestro Web.
- `features/`: criterios de aceptación BDD escritos en Gherkin.
- `scripts/validate-bdd.mjs`: contrato automático entre Gherkin y Maestro.
- `docs/escenarios-pruebas.html`: escenarios BDD con capturas producidas por Maestro.
- `docs/documentacion-tecnica.html`: resumen técnico, diagramas, flujos y patrones.
- `docs/maestro-dev-ejecucion.mp4`: video de evidencia del escenario automatizado de reserva y cancelación.

## Comprobaciones de desarrollo

```bash
npm run typecheck
npx expo-doctor
```
