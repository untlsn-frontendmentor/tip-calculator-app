const defaultValues = () => ({
  bill:   0,
  tip:    0,
  people: 0,
});

const [values, setValues] = createStore(defaultValues());

type Values = typeof values;

function PercentButton(props: { value: number }) {
  return (
    <button
      type="button"
      aria-selected={props.value == values.tip}
      class={clsx(
        'bg-c-cyan-500 text-white rounded-lg h-12 text-2xl hocus:(bg-c-cyan-300 text-c-cyan-500)',
        'aria-selected:(bg-c-cyan-strong text-c-cyan-500)',
      )}
      onClick={() => setValues('tip', props.value)}
    >
      {props.value}
      %
    </button>
  );
}

function Input(props: { placeholder?: string, of: keyof Values, icon?: string }) {
  const input = (
    <input
      class="bg-c-cyan-100 p-(y2 x4) rounded-lg text-right w-full rounded hocus:outline-c-cyan-300"
      type="number"
      value={values[props.of]}
      onInput={(ev: InputEv<HTMLInputElement>) => setValues(props.of, ev.currentTarget.valueAsNumber)}
    />
  );

  return (
    <Show when={props.icon} fallback={input}>
      <div class="relative">
        <i class={clsx(props.icon, 'absolute inset-2 text-3')} aria-hidden="true">&nbsp;</i>
        {input}
      </div>
    </Show>
  );
}

function TipResult(props: { label: string, value: number }) {
  return (
    <div class="flex items-center text-c-cyan-strong">
      <div class="mr-auto text-white text-sm">
        <p>{props.label}</p>
        <p class="text-c-cyan-400">/ person</p>
      </div>
      <p class="text-6">$</p>
      <p class="text-8">
        {!props.value || props.value == Infinity ? 0 : props.value.toFixed(2)}
      </p>
    </div>
  );
}

export default function BillForm() {
  const totalSingle = () => values.bill / values.people;
  const singleWithTip = () => totalSingle() / 100 * values.tip;

  return (
    <article class="bg-white rounded-3xl text-c-cyan-500 p-8 sm:grid-(~ cols-2) gap-12 w-full max-w-225 mx-auto">
      <section class="space-y-2">
        <p>Bill</p>
        <Input of="bill" icon="i-my-dollar" />
        <p>Select Tip %</p>
        <div
          style={{
            'grid-template-columns': 'repeat(auto-fit, minmax(120px, 1fr))',
          }}
          class="grid gap-4"
        >
          <PercentButton value={5} />
          <PercentButton value={10} />
          <PercentButton value={15} />
          <PercentButton value={25} />
          <PercentButton value={50} />
          <Input placeholder="Custom" of="tip" />
        </div>
        <p>Number of People</p>
        <Input of="people" icon="i-my-person" />
      </section>
      <section class="bg-c-cyan-500 p-6 flex-(~ col) gap-6 mt-4 rounded-lg">
        <TipResult label="Tip Amount" value={singleWithTip()} />
        <TipResult label="Total" value={totalSingle() + singleWithTip()} />
        <button
          type="button"
          class="bg-c-cyan-strong uppercase w-full h-10 rounded-lg text-xl hocus:bg-c-cyan-300 mt-auto"
          onClick={() => setValues(defaultValues())}
        >
          reset
        </button>
      </section>
    </article>
  );
}
