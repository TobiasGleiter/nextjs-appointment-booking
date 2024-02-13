export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-t from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default BaseTemplate;
