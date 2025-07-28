interface Props {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const SectionContent = ({ id, children, className }: Props) => {
  return (
    <section id={id ?? ''} className={className ?? ''}>
      <div className="w-full px-6 sm:px-12.5 lg:px-22.5 2xl:m-auto 2xl:max-w-[1140px] 2xl:p-0">
        {children}
      </div>
    </section>
  );
};
