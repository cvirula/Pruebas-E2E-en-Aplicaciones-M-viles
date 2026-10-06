# language: es
@mobile @maestro
Característica: Agendamiento y gestión de citas
  Como cliente de Turno
  Quiero reservar y administrar mis citas
  Para organizar mi tiempo de forma sencilla

  @smoke @booking @flow_booking_flow
  Escenario: Reservar y cancelar una cita correctamente
    Dado que Alex abre la aplicación con una agenda limpia
    Cuando inicia el proceso para agendar una cita
    Y selecciona el servicio "Consulta general"
    Y selecciona a la especialista "Sofía Herrera"
    Y selecciona el segundo día disponible a las "10:30"
    Y confirma los datos de la reserva
    Entonces la aplicación muestra que la cita está lista
    Y la cita aparece en la sección "Mis citas"
    Cuando Alex cancela la cita
    Entonces la cita aparece en el historial como cancelada

  @smoke @empty-state @flow_empty_state
  Escenario: Consultar la agenda cuando no existen citas
    Dado que Alex abre la aplicación con una agenda limpia
    Cuando abre la sección "Mis citas"
    Entonces la aplicación informa que aún no existen citas
    Y ofrece una acción para agendar una cita

  @smoke @professional @flow_professional_flow
  Escenario: Gestionar la agenda diaria como profesional
    Dado que Sofía abre la aplicación como profesional
    Cuando consulta su agenda de trabajo
    Entonces visualiza las tres citas programadas para hoy
    Cuando marca la primera cita como atendida
    Entonces la cita aparece como completada
