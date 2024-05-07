import { apiUrl } from "@apiConfig";
import { pictureUrl } from "@pictureConfig";
import { defaut } from "@/assets/images";
import { Checkbox,DateInput,Select,RadioButton,TextInput} from "@react/components/common/forms";
import { PageWrapper } from "@react/components/common/layout";

const HomePage = () => {
  const urlApi = `${apiUrl}xxxx`;
  const urlPicture = `${pictureUrl}xxxx`;
  const options = [
    { id: '', value: '', label: 'Aucun', hidden: true }, // Option pour aucun utilisateur sélectionné
    { id: '1', value: 'Utilisateur 1', label: 'Utilisateur 1' },
    { id: '2', value: 'Utilisateur 2', label: 'Utilisateur 2' },
    { id: '3', value: 'Utilisateur 3', label: 'Utilisateur 3' }
  ];
  return (
    <main>
      <PageWrapper className="password-page" pageTitle="Mot de passe Oublié" showMenu={false}>
      <p>{`chemin de l'api :`} {urlApi}</p>
      <p>chemin des images : {urlPicture}</p>
      <img src={defaut} alt="test" className="test-image"/>
      <Checkbox
        label="test"
        id="test"
        name="test"
        title="test"
        className="test"
        inputClassName="test"
      />
      <DateInput
        label="Date de début"
        labelClassName="date-label"
        id="DateDebut"
        name="DateDebut"
        className="date-input-row"
        inputClassName="start-date"
        title="Sélectionnez la date de début"
      />
      <Select
        id="Categorie_CreateDropdown"
        name="Categorie_CreateDropdown"
        options={options}
        label="Catégorie"
        className="Choix_Liste_Deroulante"
        isRequired={true}
      />
      <div>
      <RadioButton
        id="radio"
        name="radio"
        label="radio"
      />
      </div>
      <div>
      <TextInput
        label="Identifiant"
        id="Identifiant"
        name="Identifiant"
        placeholder="Entrez votre identifiant"
        isRequired={true}
      />
      </div>
      </PageWrapper>
    </main>
  );
};

export default HomePage;
