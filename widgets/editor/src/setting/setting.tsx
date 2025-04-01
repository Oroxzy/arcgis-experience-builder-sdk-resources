/**
  Licensing

  Copyright 2022 Esri

  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.

  A copy of the license is available in the repository's
  LICENSE file.
*/
import { React } from 'jimu-core'
import type { AllWidgetSettingProps } from 'jimu-for-builder'
import defaultMessages from './translations/default'
import {
  MapWidgetSelector,
  SettingSection,
  SettingRow
} from 'jimu-ui/advanced/setting-components'
import { Switch } from 'jimu-ui'

export default class Setting extends React.PureComponent<AllWidgetSettingProps<any>, any> {
  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  onToggle = (key: string, value: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(key, value)
    })
  }

  render () {
    const config = this.props.config || {}

    return (
      <div className="widget-setting-js-api-widget">
        <SettingSection
          className="map-selector-section"
          title={this.props.intl.formatMessage({
            id: 'selectMapWidget',
            defaultMessage: defaultMessages.selectMapWidget
          })}
        >
          <MapWidgetSelector
            onSelect={this.onMapWidgetSelected}
            useMapWidgetIds={this.props.useMapWidgetIds}
          />
        </SettingSection>

        <SettingSection title="Editor Optionen">
          <SettingRow label="Erstellen erlauben">
            <Switch
              checked={!!config.allowCreate}
              onChange={e => this.onToggle('allowCreate', e.target.checked)}
            />
          </SettingRow>
          <SettingRow label="Bearbeiten erlauben">
            <Switch
              checked={!!config.allowUpdate}
              onChange={e => this.onToggle('allowUpdate', e.target.checked)}
            />
          </SettingRow>
          <SettingRow label="Löschen erlauben">
            <Switch
              checked={!!config.allowDelete}
              onChange={e => this.onToggle('allowDelete', e.target.checked)}
            />
          </SettingRow>
        </SettingSection>
      </div>
    )
  }
}
