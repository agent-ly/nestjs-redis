import type {
  ModuleMetadata,
  InjectionToken,
  OptionalFactoryDependency,
  Type,
  Provider,
} from "@nestjs/common";

// Honourable mentions ... (In other words check these built-in interfaces out)
// Provider, ClassProvider, ExistingProvider, ValueProvider, & FactoryProvider

export type GenericOptionsFactory<Options> = {
  createOptions(): Promise<Options> | Options;
};

export type AsyncOptionsProvider<
  Options,
  OptionsFactory extends GenericOptionsFactory<Options>
> = {
  imports?: ModuleMetadata["imports"];
  useClass?: Type<OptionsFactory>;
  useExisting?: Type<OptionsFactory>;
  useValue?: Options;
  useFactory?: (...args: unknown[]) => Options;
  inject?: (InjectionToken | OptionalFactoryDependency)[];
};

export const createAsyncOptionProviders = <
  Options,
  OptionsFactory extends GenericOptionsFactory<Options>
>(
  optionsToken: InjectionToken,
  asyncOptions: AsyncOptionsProvider<Options, OptionsFactory>
): Provider => {
  if (asyncOptions.useFactory) {
    return {
      provide: optionsToken,
      useFactory: asyncOptions.useFactory,
      inject: asyncOptions.inject || [],
    };
  }
  const inject = [
    (asyncOptions.useClass || asyncOptions.useExisting) as Type<OptionsFactory>,
  ];
  return {
    provide: optionsToken,
    useFactory: (optionsFactory: OptionsFactory) => {
      return optionsFactory.createOptions();
    },
    inject,
  };
};

export const createAsyncProviders = <
  Options,
  OptionsFactory extends GenericOptionsFactory<Options>
>(
  optionsToken: InjectionToken,
  asyncOptions: AsyncOptionsProvider<Options, OptionsFactory>
): Provider[] => {
  if (asyncOptions.useExisting || asyncOptions.useFactory) {
    return [createAsyncOptionProviders(optionsToken, asyncOptions)];
  }
  if (asyncOptions.useClass) {
    return [
      createAsyncOptionProviders(optionsToken, asyncOptions),
      {
        provide: asyncOptions.useClass,
        useClass: asyncOptions.useClass,
      },
    ];
  }
  return [{ provide: optionsToken, useValue: asyncOptions.useValue }];
};
