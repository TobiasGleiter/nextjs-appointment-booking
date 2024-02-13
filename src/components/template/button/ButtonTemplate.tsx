export interface IButtonTemplate {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'text-sm' | 'text-base' | 'text-xl';
  /**
  /**
   * Button contents
   */
  label: string;
  /**
   * How large should the button be?
   */
  style?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

const ButtonTemplate: React.FC<IButtonTemplate> = ({
  primary = false,
  size,
  style,
  label,
  ...props
}) => {
  return (
    <button
      className={` rounded-full px-4 py-1 ${
        primary ? 'bg-white text-black' : 'bg-black text-white'
      } ${style} ${size}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default ButtonTemplate;
