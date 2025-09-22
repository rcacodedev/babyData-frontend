export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Bienvenido a BabyData 👶
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white p-4 shadow">
          <h2 className="text-lg font-medium text-indigo-600 mb-2">
            Resumen de hoy
          </h2>
          <p className="text-gray-600 text-sm">
            Aquí podrás ver las actividades, comidas, siestas y fotos del día de
            los peques.
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <h2 className="text-lg font-medium text-indigo-600 mb-2">
            Próximos pasos
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Configura tu organización</li>
            <li>Añade cuidadores o padres</li>
            <li>Empieza a registrar el día a día</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
